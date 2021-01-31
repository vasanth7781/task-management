import { ERROR, SUCCESS } from 'constant';
import { CREATE_TASK, LIST_TASKS } from 'hooks/constant';
import withTaskHooks from 'hooks/withTaskHooks';
import { lensPath, pathOr, set } from 'ramda';
import React, { useState } from 'react';
import { compose } from 'recompose';
import { Button, Modal, Notification } from 'rsuite';
import { NEW_TASK_MODAL_PATH, TAKS_FORM_STATE, TASK_STATE_PATH } from 'Task/constant';
import CreateTasksFormsLanding from 'Task/CreateTask/CreateTasksFormsLanding';
import { chkErrorResponse, chkSuccesResponse, convJsonToBodyData } from 'Task/taskUtilities';

interface Props {
  taskState: any;
  handleTaskState: any;
}

const TASK_NOT_CREATED = 'Task not created'
const TASK_CREATED = 'Task created'

const CreateTaskLanding: React.FC<Props> = (props: Props) => {
  const { taskState, handleTaskState } = props;
  const { taskCall } = withTaskHooks();
  const [loading, setLoading] = useState(false);

  const handleTaskAdd = () => {
    setLoading(true);
    taskCall(CREATE_TASK)(convJsonToBodyData(pathOr({}, TAKS_FORM_STATE, taskState)))
      .then((res: any) => {
        if (chkSuccesResponse(res)) {
          taskCall(LIST_TASKS)({}).then((res: any) => {
            const updatedTaskState = compose<any, any>(
              set(lensPath(TASK_STATE_PATH), pathOr([], ['tasks'], res)),
              set(lensPath(NEW_TASK_MODAL_PATH), false)
            )(taskState);
            handleTaskState([], updatedTaskState);
            Notification[SUCCESS]({
              title: TASK_CREATED,
              description: <span>Task created successfully</span>
            });
            setLoading(false);
          });
        }
        if (chkErrorResponse(res)) {
          Notification[ERROR]({
            title: TASK_NOT_CREATED,
            description: <span>{pathOr('', ['error'], res)}</span>
          });
          setLoading(false);
        }
      })
      .catch((err: any) => {
        Notification[ERROR]({
          title: TASK_NOT_CREATED,
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
