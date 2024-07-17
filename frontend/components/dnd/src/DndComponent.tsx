import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IDragNDropProps, ISortableItemProps } from "./interface";
import { Box } from "@mui/material";

// Sortable Items Component Which is responsible for containing individual sortable item
// This is wrapper of @dnd-kit which exposes draggable ref and styling to child components which
// Will Render as Part of this Component and We are expecting Child Component as part of Prop to render it from parent
const SortableItem = (props: ISortableItemProps) => {
  const { id, item, RenderListItem, onClick } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "pointer",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RenderListItem item={item} />
    </div>
  );
};

//DragNDrop Component
// Accepts:
// 1. items(list to have draggable items), 2. onDragEnd(callback to get latest value in parent)
// 3. RenderListItem(accepts list items as params and render it with layout which will be provided from parent)
// 4. WithSortableItemContainer (basically it's item container which make individual items width and styling)
const DndComponent = ({
  items: list,
  onDragEnd,
  onClick,
  RenderListItem,
  WithSortableItemContainer = Box,
}: IDragNDropProps) => {
  const [items, setItems] = useState(list);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle DragOverEvent and interchange index in array and return latest array to parent using
  // @onDragEnd callback
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id && active?.id && over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.position === active.id);
        const newIndex = items.findIndex((item) => item.position === over.id);
        const newArray = arraySwap([...items], oldIndex, newIndex);
        onDragEnd(
          newArray.map((item, index) => {
            if (item.position !== index + 1) {
              item.position = index + 1;
            }
            return item;
          })
        );
        return newArray;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        {items.map((item) => (
          <WithSortableItemContainer key={item.position}>
            <SortableItem
              id={item.position}
              item={item}
              onClick={onClick}
              RenderListItem={RenderListItem}
            />
          </WithSortableItemContainer>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DndComponent;
