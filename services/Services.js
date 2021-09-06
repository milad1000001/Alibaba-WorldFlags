import WorldServices from './worldServices'

export default $axios => ({
  world : WorldServices($axios)
})
