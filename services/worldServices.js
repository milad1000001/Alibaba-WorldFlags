export default $axios => ({
    getAllWolrdDetails () {
        return $axios.$get('/all')
    },
    getByRegion(regionName){
        return $axios.$get(`/region/${regionName}`)
    },
    getByCountry(countryName){
        return $axios.$get(`/name/${countryName}`)
    }
  })