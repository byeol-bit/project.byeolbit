import { useState } from 'react';
import '../css/NoticePage.scss';
import imgSearch from '../assets/images/search.png';

function NoticePage() {
  return (
    <div className="notice_wrap">
      <div class="notice-title-wrap">
        <div class="notice-title">공지사항입니다.</div>
        <div>
          <form action="/posts" accept-charset="UTF-8" method="get">
            <fieldset>
              <div class="search-wrap">
                <input type="search" name="notice-search" id="notice-search" placeholder="키워드를 입력해주세요" class="n-search"/>
                <div class="search-image-wrap"><img src={imgSearch}/></div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <ul>
        <li>
          <div>
            <div class="notice-full">
             <div class="notice-info-text">
               <a>
                <div class="notice-title">[공지]제목</div>
                <div class="notice-content">허위정보에 맞서는 팩트체커가 되는 길! 전문팩트체커 양성 교육을 실시합니다. 많은 참여 바랍니다. 😉</div>
               </a>
             </div>
             <div class="notice-sub-text">날짜</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div class="notice-full">
             <div class="notice-info-text">
               <a href="#">
                <div class="notice-title">[공지]제목</div>
                <div class="notice-content">허위정보에 맞서는 팩트체커가 되는 길! 전문팩트체커 양성 교육을 실시합니다. 많은 참여 바랍니다. 😉 가나다라마바사아자카타파하가나다라마바사아자차카타파하 </div>
               </a>
             </div>
             <div class="notice-sub-text">날짜</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div class="notice-full">
             <div class="notice-info-text">
               <a>
                <div class="notice-title">[공지]제목</div>
                <div class="notice-content">허위정보에 맞서는 팩트체커가 되는 길! 전문팩트체커 양성 교육을 실시합니다. 많은 참여 바랍니다. 😉</div>
               </a>
             </div>
             <div class="notice-sub-text">날짜</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div class="notice-full">
             <div class="notice-info-text">
               <a>
                <div class="notice-title">[공지]제목</div>
                <div class="notice-content">허위정보에 맞서는 팩트체커가 되는 길! 전문팩트체커 양성 교육을 실시합니다. 많은 참여 바랍니다. 😉</div>
               </a>
             </div>
             <div class="notice-sub-text">날짜</div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div class="notice-full">
             <div class="notice-info-text">
               <a>
                <div class="notice-title">[공지]제목</div>
                <div class="notice-content">허위정보에 맞서는 팩트체커가 되는 길! 전문팩트체커 양성 교육을 실시합니다. 많은 참여 바랍니다. 😉</div>
               </a>
             </div>
             <div class="notice-sub-text">날짜</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default NoticePage;
