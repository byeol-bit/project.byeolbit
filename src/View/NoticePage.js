import { useState } from 'react';
import '../css/NoticePage.scss';

function NoticePage() {
  return (
    <div className="notice_wrap">
    <table className="notice_table">
      <th width="50px">번호</th>
      <th width="450px">제목</th>
      <th width="100px">작성자</th>
      <th width="150px">등록일</th>
      <th width="90px">조회</th>
    </table>
    </div>
  )
}

export default NoticePage;
