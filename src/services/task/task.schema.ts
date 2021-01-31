import { Schema } from 'rsuite';

const { StringType, ObjectType } = Schema.Types;

export const createTaskSchema = Schema.Model({
  assigned_to: StringType().isRequired('Assignee is required'),
  message: StringType().isRequired('Message is required'),
  priority: StringType().isRequired('Priority is required'),
});