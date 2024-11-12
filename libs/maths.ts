/**
 * Clamps a value between a minimum and maximum value.
 * @param min - The minimum value.
 * @param input - The value to clamp.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
function clamp(min: number, input: number, max: number): number {
  return Math.max(min, Math.min(input, max))
}

/**
 * Maps a number from one range to another.
 * @param in_min - The lower bound of the input range.
 * @param in_max - The upper bound of the input range.
 * @param input - The input value to map.
 * @param out_min - The lower bound of the output range.
 * @param out_max - The upper bound of the output range.
 * @returns The input value mapped to the output range.
 */
function mapRange(
  in_min: number,
  in_max: number,
  input: number,
  out_min: number,
  out_max: number
): number {
  return ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

/**
 * Linearly interpolates between two values.
 * @param start - The start value.
 * @param end - The end value.
 * @param amt - The amount to interpolate between the two values.
 * @returns The interpolated value.
 */
function lerp(start: number, end: number, amt: number): number {
  return (1 - amt) * start + amt * end
}

/**
 * Truncates a number to a certain number of decimal places.
 * @param value - The value to truncate.
 * @param decimals - The number of decimal places to keep.
 * @returns The truncated value.
 */
function truncate(value: number, decimals: number): number {
  return parseFloat(value.toFixed(decimals))
}

const Maths = { lerp, clamp, mapRange, truncate }

export { clamp, lerp, mapRange, truncate }
export default Maths
