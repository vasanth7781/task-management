import React from 'react';
import { Avatar } from 'rsuite';
import styled from 'styled-components';

interface Props {
  name: string;
  img: any;
}
const TaskPanelHeader: React.FC<Props> = (props: Props) => {
  return (
    <PanelHeaderView className={'row task__header'}>
      <div className={'col-2 col-md-2'}>
        <Avatar circle src={props.img}>
          {props.name}
        </Avatar>
      </div>
      <div className={'col-10 col-md-10 align-self-center task-header-name'}>
        <h5>{props.name}</h5>
      </div>
    </PanelHeaderView>
  );
};
const PanelHeaderView = styled.div`
  &.task__header .task-header-name {
    text-align: left;
  }
`;

export default TaskPanelHeader;
