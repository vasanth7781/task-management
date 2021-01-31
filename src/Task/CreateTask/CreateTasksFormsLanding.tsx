import { pathOr } from 'ramda';
import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button, SelectPicker } from 'rsuite';
import { TAKS_FORM_STATE } from 'Task/constant';
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
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup className={'input-wrap'}>
          <ControlLabel>Priority</ControlLabel>
          <ListPriorityForTaskSelect {...props} />
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
        </FormGroup>
      </Form>
    </div>
  );
};
export default CreateTasksFormsLanding;
