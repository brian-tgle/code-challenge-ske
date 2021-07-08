import { UnavailableItems } from 'intefaces'

export const API_DEFAULT_PARAMS = {
  PER_PAGE: 100,
  PAGE: 1
}

export const DEBOUNCE_TIME = 500

export const MINIMUN_SEARCH_KEY = 3

export const IMAGE_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

export const TEST_DATA: Array<UnavailableItems> = [
  { startPx: 10, endPx: 30 },
  { startPx: 55, endPx: 65 },
  { startPx: 35, endPx: 50 },
  { startPx: 20, endPx: 40 },
  { startPx: 60, endPx: 70 }
]
