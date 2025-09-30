export interface RatingProps {
  value?: number;
  max?: number;
  readonly?: boolean;
}

export type RatingDefaultProps = Partial<RatingProps>;
