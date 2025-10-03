import React from 'react';
import { ComponentData } from '../../types';
import { Input } from '../ui/Input';
import { Text } from '../ui/Text';
import { Image } from '../ui/Image';
import { Container } from '../ui/Container';
import { Table } from '../ui/Table';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Rating } from '../ui/Rating';
import { List } from '../ui/List';
import { JsonViewer } from '../ui/JsonViewer';
import { Video } from '../ui/Video';
import { Audio } from '../ui/Audio';
import { Iframe } from '../ui/Iframe';
import { Tabs } from '../ui/Tabs';
import { Modal } from '../ui/Modal';
import { Progress } from '../ui/Progress';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Alert } from '../ui/Alert';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Pagination } from '../ui/Pagination';
import { Timeline } from '../ui/Timeline';
import { Calendar } from '../ui/Calendar';
import { Map } from '../ui/Map';
import { CodeBlock } from '../ui/CodeBlock';
import { Markdown } from '../ui/Markdown';
import { Slider } from '../ui/Slider';
import { DatePicker } from '../ui/DatePicker';
import { FileUpload } from '../ui/FileUpload';
import { Radio } from '../ui/Radio';
import Button from '../ui/Button/Button';
import { Card } from '../ui/Card/Card';

interface RenderComponentProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const RenderComponent: React.FC<RenderComponentProps> = ({ 
  component, 
  isPreview = false 
}) => {
  const baseStyle = {
    width: '100%',
    height: '100%',
    ...component.style,
  };

  switch (component.type) {
    case 'button':
      return <Button id={component.id} component={component} isPreview={isPreview} />;
    
    case 'input':
      return <Input component={component} isPreview={isPreview} />;
    
    case 'text':
      return <Text component={component} />;
    
    case 'image':
      return <Image component={component} />;
    
    case 'container':
      return <Container component={component} isPreview={isPreview} />;

    case 'card':
      return <Card {...component.props} style={component.style} isPreview={isPreview} />;

    case 'table':
      return <Table component={component} isPreview={isPreview} />;

    case 'select':
      return <Select component={component} isPreview={isPreview} />;

    case 'checkbox':
      return <Checkbox component={component} isPreview={isPreview} />;

    case 'radio':
      return <Radio component={component} isPreview={isPreview} />;

    // case 'switch':
    //   return <Switch component={component} isPreview={isPreview} />;

    case 'slider':
      return <Slider component={component} isPreview={isPreview} />;

    case 'datepicker':
      return <DatePicker component={component} isPreview={isPreview} />;

    case 'fileupload':
      return <FileUpload component={component} isPreview={isPreview} />;

    // case 'divider':
    //   return <Divider component={component} isPreview={isPreview} />;

    case 'video':
      return <Video component={component} isPreview={isPreview} />;

    case 'audio':
      return <Audio component={component} isPreview={isPreview} />;

    case 'iframe':
      return <Iframe component={component} isPreview={isPreview} />;

    case 'tabs':
      return <Tabs component={component} isPreview={isPreview} />;

    case 'modal':
      return <Modal component={component} isPreview={isPreview} />;

    case 'progress':
      return <Progress component={component} isPreview={isPreview} />;

    case 'avatar':
      return <Avatar component={component} isPreview={isPreview} />;

    case 'badge':
      return <Badge component={component} isPreview={isPreview} />;

    case 'alert':
      return <Alert component={component} isPreview={isPreview} />;

    case 'breadcrumb':
      return <Breadcrumb component={component} isPreview={isPreview} />;

    case 'pagination':
      return <Pagination component={component} isPreview={isPreview} />;

    case 'rating':
      return <Rating component={component} isPreview={isPreview} />;

    case 'timeline':
      return <Timeline component={component} isPreview={isPreview} />;

    case 'calendar':
      return <Calendar component={component} isPreview={isPreview} />;

    case 'map':
      return <Map component={component} isPreview={isPreview} />;

    case 'code':
      return <CodeBlock component={component} isPreview={isPreview} />;

    case 'markdown':
      return <Markdown component={component} isPreview={isPreview} />;

    case 'list':
      return <List component={component} isPreview={isPreview} />;

    case 'json':
      return <JsonViewer component={component} isPreview={isPreview} />;

    default:
      return (
        <div 
          style={baseStyle}
          className="bg-gray-200 flex items-center justify-center text-gray-600 text-sm border-2 border-dashed border-gray-400"
        >
          {component.type}
        </div>
      );
  }
};