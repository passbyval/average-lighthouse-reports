import { filesize } from 'filesize'

export const getKiB = (value) => filesize(value, { base: 2 })
export const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100
