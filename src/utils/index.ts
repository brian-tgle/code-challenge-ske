import { UnavailableItems } from 'intefaces'

/**
 * Union data
 * @param data
 * @returns {Array<UnavailableItems>} List of data after process
 */
export const unionList = (data: Array<UnavailableItems>): Array<UnavailableItems> => {
  // Sort this list by startPx
  data.sort((a: UnavailableItems, b: UnavailableItems) => a.startPx - b.startPx)
  // Start with first object in list, assumed that was unionGroup default value
  let unionGroup: UnavailableItems = data[0]
  // Create result array in case of we have multiple unionGroup
  const result: Array<UnavailableItems> = []
  // Run through loop, and except the first object
  for (let i = 1; i < data.length; i++) {
    // In case of the value of current unionGroup endPx in the range (startPx - endPx) of this item.
    // We will update current unionGroup endPx value by current endPx item
    // Ex: current unionGroup: {"startPx":10,"endPx":30}, current item: {"startPx":20,"endPx":40}
    // The current unionGroup will be update to: {"startPx":10,"endPx":40}
    if (unionGroup.endPx >= data[i].startPx && unionGroup.endPx <= data[i].endPx) {
      unionGroup = { ...unionGroup, endPx: data[i].endPx }
    } else if (unionGroup.endPx < data[i].startPx) {
      // Incase of current unionGroup endPx lower than current item startPx
      // We will push current unionGroup to result and apply new data.
      // Ex: current unionGroup: {"startPx":10,"endPx":30}, current item: {"startPx":40,"endPx":60}
      // In result array we will have [{"startPx":10,"endPx":30}]
      // The current unionGroup will be update to: {"startPx":40,"endPx":60}
      result.push(unionGroup)
      unionGroup = data[i]
    }
  }
  // After we finished the loop. Just add the current unionGroup to the result.
  return result.concat(unionGroup)
}
