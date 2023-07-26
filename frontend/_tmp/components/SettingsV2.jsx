import { Droppable } from "react-beautiful-dnd";

export default function SettingsV2({
  menuComponent,
  setMenuComponent,
  formComponent,
  setFormComponent,
}) {
  return (
    <Droppable droppableId="Menu">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="border-2 border-black rounded-sm px-4 p-4 gap-2 flex flex-col w-[440px] h-[490px] overflow-y-auto no-scrollbar"
        >
          <p className="text-2xl font-semibold mb-2">Custom Input</p>
          {menuComponent.map(
            (
              { component: Component, componentId: uid },
              index
            ) => (
              <Component dragId={uid} key={uid} index={index}/>
            )
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
