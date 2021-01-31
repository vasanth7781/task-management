import { pathOr } from 'ramda';
import React from 'react';
import { Icon, SelectPicker } from 'rsuite';
import { TASK_SORT_SELECTOR } from 'Task/constant';
import { getIconNameBySort } from 'Task/taskUtilities';

interface Props {
  handleSortSelection: any;
  priority: any;
}
const SortTaskLanding: React.FC<Props> = (props: Props) => {
  return (
    <SelectPicker
      className={''}
      groupBy="role"
      placeholder="Select sort by"
      data={TASK_SORT_SELECTOR}
      onSelect={(value: any) => props.handleSortSelection(value, props.priority)}
      renderMenuItem={(label: any, item: any) => {
        return (
          <div>
            <Icon icon={getIconNameBySort(pathOr('', ['value'], item))} /> {label}
          </div>
        );
      }}
      renderMenuGroup={(label: any, item: any) => {
        return (
          <div>
            <Icon icon={'sort'} /> {label} - ({item.children.length})
          </div>
        );
      }}
      renderValue={(value: any, item: any) => {
        return (
          <div>
            <span style={{ color: '#575757' }}>
              <Icon icon={getIconNameBySort(pathOr('', ['value'], item))} />
            </span>{' '}
            {value}
          </div>
        );
      }}
    />
  );
};
export default SortTaskLanding;
