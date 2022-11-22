import _ from "lodash";

export function paginate(item, pageNumber, pageSize){
    let startIndex = (pageNumber-1)*pageSize;
    return _(item).slice(startIndex).take(pageSize).value() //Take pageSize element starting from startIndex
}