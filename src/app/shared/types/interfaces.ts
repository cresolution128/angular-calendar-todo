export interface IAppointment {
  id: number,
  date: Date,
  title: string
}

export interface IDialogData {
  mode: 'string',
  data: {
    id: number,
    title: string,
    date: Date
  }
}