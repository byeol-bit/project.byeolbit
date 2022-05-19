import { useState } from 'react';
import '../css/NoticePage.scss';
import imgSearch from '../assets/images/search.png';

function NoticePage() {

  const [pageNum, setPageNum] = useState(2);

  function getPageNum(index){
    let page = 1;
    let countList = 10;
    let countPage = 10;

    let totalCount = 255;

    let totalPage = totalCount / countList;

    if(totalCount % countList > 0){
      totalPage++;
      totalPage = parseInt(totalPage, 10);
    }

    if(index === 'first'){
      page = 1;
      setPageNum(2);
    }else if(index === 'before'){
      if(pageNum - 4 <= 0){
        setPageNum(2);
        page = 1;
      }else{
        setPageNum(pageNum - 3);
        page = pageNum - 3;
      }

    }else if(index === '-1'){
      if(pageNum - 2 <= 0){
        setPageNum(2);
        page = 1;
      }else{
        setPageNum(pageNum - 1);
        page = pageNum - 1;
      }
    }else if(index === '0'){
      page = pageNum;
    }else if(index === '1'){
      if(pageNum + 1 >= totalPage){
        setPageNum(totalPage - 1);
        page = totalPage;
      }else{
        setPageNum(pageNum + 1);
        page = pageNum + 1;
      }
    }else if(index === 'next'){
      if(pageNum + 3 >= totalPage){
        setPageNum(totalPage - 1);
        page = totalPage;
      }else{
        setPageNum(pageNum + 3);
        page = pageNum + 3;
      }
    }
    else if(index === 'last'){
      setPageNum(totalPage - 1);
      page = totalPage;
    }


  }

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
      <div class="notice-bottom">
        <div class="notice-nav-wrap">
          <nav>
            <span class="first" onClick={()=>{getPageNum('first')}}>처음</span>
            <span class="before" onClick={()=>{getPageNum('before')}}>이전</span>
            <span  onClick={()=>{getPageNum('-1')}}>{pageNum-1}</span>
            <span  onClick={()=>{getPageNum('0')}}>{pageNum}</span>
            <span  onClick={()=>{getPageNum('1')}}>{pageNum+1}</span>
            <span class="next"  onClick={()=>{getPageNum('next')}}>다음</span>
            <span class="last"  onClick={()=>{getPageNum('last')}}>끝</span>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NoticePage;
