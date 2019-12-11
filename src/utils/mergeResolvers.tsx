import { IMocks } from "graphql-tools"

type ResolvedScalar = string | number | boolean | null

export interface ResolvedValueArray extends Array<ResolvedValue> { }
export type ResolvedValue =
  | ResolvedScalar
  | ResolvedValueArray
  | { [key: string]: ResolvedValue }
type ResolverFunction = (...args: any[]) => ResolvedValue

export interface ResolverMap {
  [key: string]: () => {
    [key: string]: ResolvedValue | ResolverFunction
  } | null
}

export type CustomResolver = ResolverMap | IMocks

const mergeResolvers = (target: CustomResolver, input?: CustomResolver) => {
  if (input !== undefined) {
    const inputTypenames = Object.keys(input)
    const merged = inputTypenames.reduce(
      (accum, key) => {
        const inputResolver: any = input[key]
        if (target.hasOwnProperty(key)) {
          const targetResolver: any = target[key]
          const resolvedInput = inputResolver()
          const resolvedTarget = targetResolver()
          if (
            !!resolvedTarget &&
            !!resolvedInput &&
            typeof resolvedTarget === "object" &&
            typeof resolvedInput === "object" &&
            !Array.isArray(resolvedTarget) &&
            !Array.isArray(resolvedInput)
          ) {
            const newValue = { ...resolvedTarget, ...resolvedInput }
            return {
              ...accum,
              [key]: () => newValue,
            }
          }
        }
        return { ...accum, [key]: inputResolver }
      },
      { ...target },
    )
    return merged
  } else {
    const merged = { ...target }
    return merged
  }
}

export default mergeResolvers