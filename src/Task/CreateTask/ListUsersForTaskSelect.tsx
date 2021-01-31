import { pathOr } from 'ramda';
import React from 'react';
import { Avatar, SelectPicker } from 'rsuite';
import { TAKS_FORM_STATE } from 'Task/constant';
import { mappedUserData } from 'Task/taskUtilities';

interface Props {
  taskState: any;
  handleTaskState: any;
}

const ListUsersForTaskSelect: React.FC<Props> = (props: Props) => {
  const { handleTaskState, taskState } = props;
  return (
    <SelectPicker
      data={mappedUserData(pathOr([], ['usersLists'], taskState))}
      style={{ width: '100%' }}
      placeholder="Select User"
      renderMenuItem={(label: any, item: any) => {
        return (
          <div className={'row'}>
            <div className={'col-2'}>
              <Avatar circle src={pathOr('', ['picture'], item)}></Avatar>
            </div>
            <div className={'col-8 align-self-center'}>{label}</div>
          </div>
        );
      }}
      renderMenuGroup={(label: any, item: any) => {
        return (
          <div>
            <i className="rs-icon rs-icon-group" /> {label} - ({item.children.length})
          </div>
        );
      }}
      onSelect={(value: any, item: any, event: any) => handleTaskState([...TAKS_FORM_STATE, 'assigned_to'], value)}
      renderValue={(value: any, item: any) => {
        return (
          <div className={'row'}>
            <div className={'col-2'}>
              <Avatar circle src={pathOr('', ['picture'], item)}></Avatar>
            </div>
            <div className={'col-8 align-self-center'}>{pathOr('', ['label'], item)}</div>
          </div>
        );
      }}
    />
  );
};

export default ListUsersForTaskSelect;
