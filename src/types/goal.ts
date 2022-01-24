import Task from './task';

class Goal {
  _id: String = "";
  userId: String = "";
  title: String = "";
  description: String = "";
  createdOn: String = "";
  updatedOn: String = "";
  startOn: String = ""; // should these be Date()?
  endOn: String = "";
  active: boolean = false;
  tasks: Task[] = [];
}

export default Goal;
