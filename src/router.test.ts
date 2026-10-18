import { describe, it, expect } from 'vitest'
import { router } from './router'

describe('router', () => {
  it('registers five routes', () => {
    expect(router.getRoutes()).toHaveLength(5)
  })

  it('resolves the home route', () => {
    const resolved = router.resolve('/')
    expect(resolved).toBeDefined()
    expect(resolved.path).toBe('/')
  })

  it('resolves project list, project detail and preferences routes', () => {
    expect(router.resolve('/projects').path).toBe('/projects')
    expect(router.resolve('/projects/atlas').path).toBe('/projects/atlas')
    expect(router.resolve('/preferences').path).toBe('/preferences')
  })

  it('resolves catch-all route', () => {
    expect(router.resolve('/anything').path).toBe('/anything')
  })
})
