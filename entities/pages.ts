export const UNIP_BASE_URL = "https://ava.ead.unip.br/webapps"

export enum Pages {
  LOGIN = `/login`,
  HOME = `/portal/execute/tabs/tabAction?tab_tab_group_id=_10_1`,
  ALL_COURSES = `/portal/execute/tabs/tabAction?tab_tab_group_id=_25_1`,
  COURSE_GRADES = `${UNIP_BASE_URL}/bb-mygrades-BBLEARN/myGrades?stream_name=mygrades&is_stream=false&course_id=_`
}
