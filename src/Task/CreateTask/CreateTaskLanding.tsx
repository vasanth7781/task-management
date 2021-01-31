import withTaskHooks from 'hooks/withTaskHooks';
import { lensPath, pathOr, set } from 'ramda';
import React, { useState } from 'react';
import { compose } from 'recompose';
import { Button, Modal, Notification } from 'rsuite';
import { NEW_TASK_MODAL_PATH } from 'Task/constant';
import CreateTasksFormsLanding from 'Task/CreateTask/CreateTasksFormsLanding';
import { chkErrorResponse, chkSuccesResponse, convJsonToBodyData } from 'Task/taskUtilities';

interface Props {
  taskState: any;
  handleTaskState: any;
}

const CreateTaskLanding: React.FC<Props> = (props: Props) => {
  const { taskState, handleTaskState } = props;
  const { taskCall } = withTaskHooks();
  const [loading, setLoading] = useState(false);

  const handleTaskAdd = () => {
    setLoading(true);
    taskCall('taskCreate')(convJsonToBodyData(pathOr({}, ['newTask'], taskState)))
      .then((res: any) => {
        if (chkSuccesResponse(res)) {
          taskCall('listTasks')({}).then((res: any) => {
            const updatedTaskState = compose<any, any>(
              set(lensPath(['taskLists']), pathOr([], ['tasks'], res)),
              set(lensPath(NEW_TASK_MODAL_PATH), false)
            )(taskState);
            handleTaskState([], updatedTaskState);
            Notification['success']({
              title: 'Task created',
              description: <span>Task created successfully</span>
            });
            setLoading(false);
          });
        }
        if (chkErrorResponse(res)) {
          Notification['error']({
            title: 'Task not created',
            description: <span>{pathOr('', ['error'], res)}</span>
          });
          setLoading(false);
        }
      })
      .catch((err: any) => {
        Notification['error']({
          title: 'Task not created',
          description: <span>Somthing went wrong</span>
        });
        setLoading(false);
      });
  };
  return (
    <div className={'create__tasks'}>
      <Modal
        show={pathOr(false, NEW_TASK_MODAL_PATH, taskState)}
        onHide={() => handleTaskState(NEW_TASK_MODAL_PATH, false)}
        className={'create-task-modal'}
      >
        <Modal.Header>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTasksFormsLanding {...props} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleTaskState(NEW_TASK_MODAL_PATH, false)}>Cancel</Button>
          <Button appearance={'primary'} loading={loading} onClick={() => handleTaskAdd()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTaskLanding;
