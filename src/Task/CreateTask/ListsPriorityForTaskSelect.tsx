import { pathOr } from 'ramda';
import React from 'react';
import { SelectPicker } from 'rsuite';
import { TAKS_FORM_STATE, TASK_PRIORITY_SELECTOR } from 'Task/constant';

interface Props {
  taskState: any;
  handleTaskState: any;
}

const ListPriorityForTaskSelect: React.FC<Props> = (props: Props) => {
  const { handleTaskState, taskState } = props;
  return (
    <SelectPicker
      data={TASK_PRIORITY_SELECTOR}
      style={{ width: '100%' }}
      placeholder="Select Prority"
      renderMenuItem={(label: any, item: any) => {
        return <div>{label}</div>;
      }}
      onSelect={(value: any, item: any, event: any) => handleTaskState([...TAKS_FORM_STATE, 'priority'], value)}
      renderValue={(value: any, item: any) => {
        return <div>{pathOr('', ['label'], item)}</div>;
      }}
    />
  );
};

export default ListPriorityForTaskSelect;
