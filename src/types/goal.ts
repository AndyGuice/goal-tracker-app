import TaskModel from './task'

class Goal {
  _id: String = ''
  userId: String = ''
  title: String = ''
  description: String = ''
  createdOn: String = ''
  updatedOn: String = ''
  startOn: String = ''
  endOn: String = ''
  active: boolean = true
  tasks: TaskModel[] = []
}

export default Goal
