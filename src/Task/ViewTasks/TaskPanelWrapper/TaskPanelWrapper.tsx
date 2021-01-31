import TaskPanelBody from 'Components/TaskPanelBody';
import TaskPanelHeader from 'Components/TaskPanelHeader';
import { equals, filter, head, pathOr } from 'ramda';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Icon } from 'rsuite';

interface TaskPanelWrapperProps {
  data: any;
  users: any;
  index: number;
}
const TaskPanelWrapper: React.FC<TaskPanelWrapperProps> = (props: TaskPanelWrapperProps) => {
  const { data, users } = props;
  const filterCurrentUser = head(
    filter((user: any) => equals(pathOr('', ['id'], user), pathOr('', ['assigned_to'], data)), users)
  );
  return (
    <div>
      {data && (
        <Draggable draggableId={`${props.index}`} index={props.index}>
          {(provided: any, snapShot: any) => {
            return (
              <div
                ref={provided.innerRef}
                isDragging={snapShot.isDragging}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className={'task__pheader'} style={{ height: '45px' }}>
                  <TaskPanelHeader
                    img={pathOr('', ['picture'], filterCurrentUser)}
                    name={pathOr('', ['name'], filterCurrentUser)}
                  />
                </div>
                <div className={'mt-4 task__pbody'} style={{ height: '100px' }}>
                  <TaskPanelBody message={pathOr('', ['message'], data)} createdAt={pathOr('', ['created_on'], data)} />
                </div>
              </div>
            );
          }}
        </Draggable>
      )}
    </div>
  );
};
export default TaskPanelWrapper;
