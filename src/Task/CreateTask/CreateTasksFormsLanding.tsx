import { ERROR } from 'constant';
import { pathOr } from 'ramda';
import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button, SelectPicker } from 'rsuite';
import { NEW_TASK_NAME, TAKS_FORM_STATE } from 'Task/constant';
import ListPriorityForTaskSelect from './ListsPriorityForTaskSelect';
import ListUsersForTaskSelect from './ListUsersForTaskSelect';

interface Props {
  taskState: any;
  handleTaskState: any;
}
const CreateTasksFormsLanding: React.FC<Props> = (props: Props) => {
  const { handleTaskState, taskState } = props;
  return (
    <div>
      <Form>
        <FormGroup className={'input-wrap'}>
          <ControlLabel>Assignee</ControlLabel>
          <ListUsersForTaskSelect {...props} />
          {pathOr(false, [ERROR, NEW_TASK_NAME, 'assigned_to', 'hasError'], taskState) && <HelpBlock style={{ color: 'red' }}>{ pathOr(false, [ERROR, NEW_TASK_NAME, 'assigned_to','errorMessage'],taskState)}</HelpBlock>}
        </FormGroup>
        <FormGroup className={'input-wrap'}>
          <ControlLabel>Priority</ControlLabel>
          <ListPriorityForTaskSelect {...props} />
          {pathOr(false, [ERROR, NEW_TASK_NAME, 'priority', 'hasError'], taskState) && <HelpBlock style={{ color: 'red' }}>{ pathOr(false, [ERROR, NEW_TASK_NAME, 'priority','errorMessage'],taskState)}</HelpBlock>}
        </FormGroup>

        <FormGroup className={'input-wrap'}>
          <ControlLabel>Message</ControlLabel>
          <FormControl
            rows={5}
            name="textarea"
            className={'task-input'}
            componentClass="textarea"
            onChange={(value: any) => handleTaskState([...TAKS_FORM_STATE, 'message'], value)}
          />
          {pathOr(false, [ERROR, NEW_TASK_NAME, 'message', 'hasError'], taskState) && <HelpBlock style={{ color: 'red' }}>{ pathOr(false, [ERROR, NEW_TASK_NAME, 'message','errorMessage'],taskState)}</HelpBlock>}
        </FormGroup>
      </Form>
    </div>
  );
};
export default CreateTasksFormsLanding;
