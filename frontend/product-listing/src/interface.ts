import { DragEndEvent } from "@dnd-kit/core";
import { CSSProperties, ReactNode } from "react";

export interface ICommonComponent {
  [key: string]: unknown;
  children?: ReactNode;
}
export interface IListItem {
  position: number;
  [key: string]: any;
}
export interface IDragNDropProps {
  items: IListItem[];
  onDragEnd: (items: IListItem[]) => void;
  RenderListItem: React.FC<ICommonComponent>;
  WithSortableItemContainer?: React.FC<ICommonComponent>;
}
export interface ISortableContainerProps {
  children: ReactNode;
  style?: CSSProperties;
  [key: string]: any;
}

export interface ISortableItemProps extends IListItem {
  RenderListItem: React.FC<ICommonComponent>;
}
