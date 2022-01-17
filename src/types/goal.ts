class Goal {
  _id: String = "";
  userId: String = "";
  title: String = "";
  description: String = "";
  quantity: Number = 0;
  cadence: String = "";
  complete: boolean = false;
  createdOn: Date = new Date('2022-01-01T01:01:01:000Z');
  updatedOn: Date = new Date('2022-01-01T01:01:01:000Z');
}

export default Goal;