import React from "react";

export default  function PaginationComponent({totalPages=30,totalResults=300,offset=6,currentIndex=1,callback}){
    let start = (currentIndex - offset) < 1 ? 1:currentIndex - offset;
    let end = (currentIndex + offset) > totalPages? totalPages : currentIndex + offset;
    let nextBtn =  <PaginationElement onclick={callback} data={"Next"} />
    let firstBtn = <PaginationElement onclick={callback} data={"First"} />
    let lastBtn =  <PaginationElement  onclick={callback} data={"Last"} />
    let previousBtn = <PaginationElement onclick={callback} data={"Previous"} />
    let placeholderBtn = <PaginationElement onclick={callback} data={"..."} />
    let lastIndexBtn = <PaginationElement onclick={callback} data={totalPages} />
    let items = []
    if(currentIndex !== 1){
        items.push(firstBtn);
        items.push(previousBtn)
    }
    if(start > 1){
        items.push(placeholderBtn)
    }

    for(let i=start;i<=end;i++){
        if(i===currentIndex){
            let item = <PaginationElement active={true} data={i} onclick={callback} />
            items.push(item)
            continue;
        }
        let item = <PaginationElement active={false} data={i} onclick={callback} />
        items.push(item)
    }
    if(end < totalPages){
        items.push(placeholderBtn)
    }
    if(currentIndex !== totalPages){
        items.push(lastIndexBtn)
        items.push(nextBtn)
        items.push(lastBtn)
    }
    return <div className="border-t border-gray-800 pt-8 border-gray-400 flex justify-center my-6">
        {items.map((item,key)=>{
            return <div className="block" key={key}>{item}</div>;
        })}
    </div>
}
const PaginationElement = function({data,onclick,active=false}){
    let style = active ? 'px-5 py-1 bg-orange-500 hover:bg-orange-500 hover:border-orange-500 border-gray-700 border rounded ml-1 text-white text-center': 'px-5 py-1 bg-g-gray-600 hover:bg-orange-500 hover:border-orange-500 border-gray-700 border rounded ml-1 text-white text-center';
    return <div className={style} onClick={onclick}>{data}</div>
}

