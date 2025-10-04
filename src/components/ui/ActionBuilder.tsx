import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export interface ActionDescriptor {
  type: 'runQuery' | 'openModal' | 'navigate' | 'setState' | 'showToast' | string;
  payload?: Record<string, unknown>;
}

interface ActionBuilderProps {
  value?: ActionDescriptor | string;
  onChange: (v: ActionDescriptor | string) => void;
}

/**
 * ActionBuilder
 * - Syncs local state when external `value` changes
 * - Calls onChange only when user performs an action (change/select/click Apply)
 * - Includes an optional "Custom JS" code box where the user can provide a function body
 *   that receives the current payload and must return a new payload object.
 */
const ActionBuilder: React.FC<ActionBuilderProps> = ({ value, onChange }) => {
  const { sqlQueries, apis, pages } = useAppStore();

  // derive initial from value prop
  const initial =
    typeof value === 'string'
      ? { type: value, payload: {} as Record<string, unknown> }
      : (value || { type: '', payload: {} });

  const [type, setType] = React.useState<string>(initial.type as string);
  const [payload, setPayload] = React.useState<Record<string, unknown>>(initial.payload || {});

  // Custom JS editor state
  const [showCustomEditor, setShowCustomEditor] = React.useState<boolean>(false);
  const [customFnCode, setCustomFnCode] = React.useState<string>(
    `// Example: receive payload and return a modified payload\n// payload is an object. Return a new object.\nreturn {\n  ...payload,\n  transformedAt: new Date().toISOString(),\n};`
  );
  const [customFnError, setCustomFnError] = React.useState<string | null>(null);
  const [lastAppliedPreview, setLastAppliedPreview] = React.useState<Record<string, unknown> | null>(null);

  // Sync local state when external `value` changes (no onChange in this effect)
  React.useEffect(() => {
    if (!value) {
      setType('');
      setPayload({});
      return;
    }
    const newType = typeof value === 'string' ? value : value.type;
    const newPayload = typeof value === 'string' ? {} : (value.payload || {});
    // Only update state when it actually differs (reduce unnecessary renders)
    setType((prev) => (prev === newType ? prev : newType));
    setPayload((prev) => {
      // cheap deep-check using JSON (ok here because payloads are small)
      try {
        if (JSON.stringify(prev) === JSON.stringify(newPayload)) return prev;
      } catch {
        // fall back to set
      }
      return newPayload;
    });
  }, [value]);

  // Helper to avoid setting identical values (guard to reduce re-updates)
  const safeSetPayload = React.useCallback((newPayload: Record<string, unknown>, notify = true) => {
    try {
      if (JSON.stringify(payload) === JSON.stringify(newPayload)) {
        // no-op
        return;
      }
    } catch {
      // if stringify fails, continue to set
    }
    setPayload(newPayload);
    if (notify) onChange({ type, payload: newPayload });
  }, [payload, onChange, type]);

  // Handlers - user-initiated only
  const handleTypeChange = (newType: string) => {
    if (newType === type) return;
    setType(newType);
    onChange({ type: newType, payload });
  };

  const setPayloadKey = (key: string, v: unknown) => {
    const newPayload = { ...(payload || {}), [key]: v };
    safeSetPayload(newPayload);
  };

  // Apply custom JS function: the user supplies a function BODY.
  // We wrap it in a Function('payload', <body>) and run safely inside try/catch.
  const handleApplyCustomFunction = () => {
    setCustomFnError(null);
    setLastAppliedPreview(null);
    try {
      // Create a function that receives payload and returns a new payload
      // Example: user code `return { ...payload, x: 1 }`
      // eslint-disable-next-line no-new-func
      const fn = new Function('payload', customFnCode) as (p: any) => any;
      const result = fn(payload || {});
      if (result == null || typeof result !== 'object') {
        setCustomFnError('Custom function must return a payload object.');
        return;
      }
      // update state and notify parent
      safeSetPayload(result, true);
      setLastAppliedPreview(result);
    } catch (err: any) {
      setCustomFnError(String(err?.message || err));
    }
  };

  // Reset payload to empty (user action)
  const handleClearPayload = () => {
    safeSetPayload({}, true);
  };

  return (
    <div className="space-y-3">
      {/* Action Type */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Action</label>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
        >
          <option value="">Select action</option>
          <option value="runQuery">Run Query</option>
          <option value="openModal">Open Modal</option>
          <option value="navigate">Navigate</option>
          <option value="setState">Set State</option>
          <option value="showToast">Show Toast</option>
        </select>
      </div>

      {/* Type-specific UIs */}
      {type === 'runQuery' && (
        <div className="space-y-2">
          <label className="text-xs text-gray-400">Query / API</label>
          <select
            value={(payload.type as string) || ''}
            onChange={(e) => setPayloadKey('type', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Select source</option>
            <option value="sql">SQL Query</option>
            <option value="api">API</option>
          </select>

          {String(payload.type) === 'sql' && (
            <select
              value={(payload.queryId as string) || ''}
              onChange={(e) => setPayloadKey('queryId', e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              <option value="">Select SQL query</option>
              {sqlQueries.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.name}
                </option>
              ))}
            </select>
          )}

          {String(payload.type) === 'api' && (
            <select
              value={(payload.apiId as string) || ''}
              onChange={(e) => setPayloadKey('apiId', e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              <option value="">Select API</option>
              {apis.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          )}

          <div className="text-xs text-gray-400">Optional payload params (JSON)</div>
          <textarea
            rows={3}
            value={JSON.stringify(payload.params || {}, null, 2)}
            onChange={(e) => {
              try {
                const parsed = e.target.value.trim() ? JSON.parse(e.target.value) : {};
                setPayloadKey('params', parsed);
              } catch {
                // keep user input tolerant — don't set an invalid JSON; show nothing special here
                setPayloadKey('params', {});
              }
            }}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-xs"
          />
        </div>
      )}

      {type === 'openModal' && (
        <div className="space-y-2">
          <label className="text-xs text-gray-400">Modal Component ID</label>
          <input
            value={(payload.modalId as string) || ''}
            onChange={(e) => setPayloadKey('modalId', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="modal-component-id"
          />
          <div className="text-xs text-gray-400">Optional modal props (JSON)</div>
          <textarea
            rows={3}
            value={JSON.stringify(payload.props || {}, null, 2)}
            onChange={(e) => {
              try {
                const parsed = e.target.value.trim() ? JSON.parse(e.target.value) : {};
                setPayloadKey('props', parsed);
              } catch {
                setPayloadKey('props', {});
              }
            }}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-xs"
          />
        </div>
      )}

      {type === 'navigate' && (
        <div className="space-y-2">
          <label className="text-xs text-gray-400">Page</label>
          <select
            value={(payload.pageId as string) || ''}
            onChange={(e) => setPayloadKey('pageId', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Select Page</option>
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-400">Optional params (JSON)</div>
          <textarea
            rows={2}
            value={JSON.stringify(payload.params || {}, null, 2)}
            onChange={(e) => {
              try {
                const parsed = e.target.value.trim() ? JSON.parse(e.target.value) : {};
                setPayloadKey('params', parsed);
              } catch {
                setPayloadKey('params', {});
              }
            }}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-xs"
          />
        </div>
      )}

      {type === 'setState' && (
        <div className="space-y-2">
          <label className="text-xs text-gray-400">State Key</label>
          <input
            value={(payload.key as string) || ''}
            onChange={(e) => setPayloadKey('key', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <label className="text-xs text-gray-400">Value (JSON)</label>
          <textarea
            rows={2}
            value={JSON.stringify(payload.value ?? '', null, 2)}
            onChange={(e) => {
              try {
                const parsed = e.target.value.trim() ? JSON.parse(e.target.value) : e.target.value;
                setPayloadKey('value', parsed);
              } catch {
                setPayloadKey('value', e.target.value);
              }
            }}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-xs"
          />
        </div>
      )}

      {type === 'showToast' && (
        <div className="space-y-2">
          <label className="text-xs text-gray-400">Message</label>
          <input
            value={(payload.message as string) || ''}
            onChange={(e) => setPayloadKey('message', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <label className="text-xs text-gray-400">Variant</label>
          <select
            value={(payload.variant as string) || 'info'}
            onChange={(e) => setPayloadKey('variant', e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      )}

      {/* Custom JS Editor (optional) */}
      <div className="bg-gray-800 rounded space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Custom JS (Optional)</div>
          <div className="text-xs text-gray-400">{showCustomEditor ? 'On' : 'Off'}</div>
        </div>
        <div className="text-xs text-gray-400">
          Provide a JS function body that receives <code>payload</code> and must <code>return</code> a new payload object.
        </div>

        <textarea
          rows={6}
          value={customFnCode}
          onChange={(e) => setCustomFnCode(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white font-mono text-xs"
        />

        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-600 rounded"
            onClick={() => setShowCustomEditor((s) => !s)}
            type="button"
          >
            {showCustomEditor ? 'Hide Editor' : 'Show Editor'}
          </button>

          <button
            className="px-3 py-1 bg-teal-600 rounded"
            onClick={() => {
              setCustomFnError(null);
              handleApplyCustomFunction();
            }}
            type="button"
          >
            Apply Function
          </button>

          <button
            className="px-3 py-1 bg-red-600 rounded"
            onClick={() => {
              setCustomFnError(null);
              setCustomFnCode('');
            }}
            type="button"
          >
            Clear Function
          </button>

          <button
            className="px-3 py-1 bg-gray-600 rounded"
            onClick={() => handleClearPayload()}
            type="button"
          >
            Clear Payload
          </button>
        </div>

        {customFnError ? <div className="text-xs text-red-400 mt-1">{customFnError}</div> : null}
        {lastAppliedPreview ? (
          <div className="text-xs text-gray-300 mt-1">Preview after apply: <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(lastAppliedPreview, null, 2)}</pre></div>
        ) : null}
      </div>

      {/* Preview */}
      <div className="text-xs text-gray-400">Preview: {JSON.stringify({ type, payload })}</div>
    </div>
  );
};

export default ActionBuilder;
