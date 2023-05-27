export const UNIP_BASE_URL = "https://ava.ead.unip.br";

export enum Pages {
  LOGIN = `/webapps/login`,
  HOME = `/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_10_1`,
  ALL_COURSES = `/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_25_1`,
  COURSE_PAGE = "/webapps/blackboard/content/listContent.jsp?course_id=_",
  COURSE_GRADES = `/webapps/bb-mygrades-BBLEARN/myGrades?stream_name=mygrades&is_stream=false&course_id=_`,
}
