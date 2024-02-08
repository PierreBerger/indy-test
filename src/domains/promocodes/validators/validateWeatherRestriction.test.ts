import { describe, vi, it, beforeEach, expect, afterAll } from 'vitest'

describe('validateWeatherRestriction', () => {
  beforeEach(() => {
    vi.mock('../../../libs/openweather/openweather.ts', () => ({
      fetchWeatherByCityName: vi.fn().mockImplementation(() => ({ weather: 'clear', temp: 15 })),
    }))
  })

  afterAll(() => {
    vi.resetAllMocks()
  })

  it('should not be valid when no town in args', async () => {
    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    const res = await validateWeatherRestriction({ is: 'clear', temp: { eq: 15 } }, {})

    expect(res.isValid).toBe(false)
    expect(res.reasons).toStrictEqual(['weather_not_valid'])
  })

  it('should not be valid when weather does not match', async () => {
    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    const res = await validateWeatherRestriction(
      { is: 'sun', temp: { eq: 15 } },
      { meteo: { town: 'Grenoble' } },
    )

    expect(res.isValid).toBe(false)
    expect(res.reasons).toStrictEqual(['weather_not_valid'])
  })

  it('should not validate weather restriction when temp is not eq', async () => {
    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    const result = await validateWeatherRestriction(
      { is: 'clear', temp: { eq: 20 } },
      { meteo: { town: 'Grenoble' } },
    )

    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['weather_not_valid'])
  })

  it('should not validate weather restriction when temp is not in range', async () => {
    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    const result = await validateWeatherRestriction(
      { is: 'clear', temp: { lt: 10, gt: 5 } },
      { meteo: { town: 'Grenoble' } },
    )

    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['weather_not_valid'])
  })

  it('should not validate weather restriction when temps is too high', async () => {
    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    const result = await validateWeatherRestriction(
      { is: 'clear', temp: { lt: 10 } },
      { meteo: { town: 'Grenoble' } },
    )

    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['weather_not_valid'])
  })

  it('should not validate weather restriction when temps is too low', async () => {
    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    const result = await validateWeatherRestriction(
      { is: 'clear', temp: { gt: 20 } },
      { meteo: { town: 'Grenoble' } },
    )

    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['weather_not_valid'])
  })

  describe('should validate valid cases', async () => {
    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    it('equal', async () => {
      const result = await validateWeatherRestriction(
        { is: 'clear', temp: { eq: 15 } },
        { meteo: { town: 'Grenoble' } },
      )

      expect(result.isValid).toBe(true)
      expect(result.reasons).toBeUndefined()
    })

    it('in range', async () => {
      const result = await validateWeatherRestriction(
        { is: 'clear', temp: { gt: 10, lt: 20 } },
        { meteo: { town: 'Grenoble' } },
      )

      expect(result.isValid).toBe(true)
      expect(result.reasons).toBeUndefined()
    })
  })

  it('should invalidate when fetchWeatherByCityName throw', async () => {
    vi.resetAllMocks()
    vi.doMock('../../../libs/openweather/openweather.ts', () => ({
      fetchWeatherByCityName: vi.fn().mockRejectedValueOnce(() => new Error('error')),
    }))

    const { validateWeatherRestriction } = await import('./validateWeatherRestriction')

    const result = await validateWeatherRestriction(
      { is: 'clear', temp: { eq: 15 } },
      { meteo: { town: 'Grenoble' } },
    )

    expect(result.isValid).toBe(false)
    expect(result.reasons).toStrictEqual(['weather_not_valid'])
  })
})
