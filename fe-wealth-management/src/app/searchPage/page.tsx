'use client'
import "../../../styles/global.css"
import { useState, useEffect, useCallback, useRef } from 'react'
import { MapPin, Clock, DollarSign, Star, Filter, Search, Heart, Loader, ChevronDown, ChevronUp, List, Map, Crosshair } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'

// Generate 100 mock gym data
const generateMockGyms = () => {
  const locations = ['Navi Mumbai', 'Bandra', 'Punjab', 'Pune', 'Thane', 'Byculla', 'Dombivli', 'Kalyan']
  const amenities = ['Pool', 'Sauna', 'Classes', 'Personal Training', '24/7 Access', 'Spa', 'Yoga Studio', 'CrossFit Area']

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Gym ${i + 1}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    price: Math.floor(Math.random() * 40) + 10,
    travelTime: Math.floor(Math.random() * 30) + 5,
    rating: (Math.random() * 2 + 3).toFixed(1),
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
    amenities: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => amenities[Math.floor(Math.random() * amenities.length)])
  }))
}

const allGyms = generateMockGyms()
const allLocations = [...new Set(allGyms.map(gym => gym.location))]

// Mock API function (replace with actual API call in production)
const fetchGyms = async (filters, page, perPage) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const filteredGyms = allGyms.filter(gym => 
    gym.price <= filters.maxPrice &&
    gym.travelTime <= filters.maxTravelTime &&
    (filters.location === '' || gym.location.toLowerCase() === filters.location.toLowerCase()) &&
    (filters.searchTerm === '' || gym.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
    (filters.amenities.length === 0 || filters.amenities.every(amenity => gym.amenities.includes(amenity)))
  )

  const totalGyms = filteredGyms.length
  const totalPages = Math.ceil(totalGyms / perPage)
  const paginatedGyms = filteredGyms.slice((page - 1) * perPage, page * perPage)

  return { gyms: paginatedGyms, totalPages, totalGyms }
}

// Mock API function for location suggestions
const fetchLocationSuggestions = async (query) => {
  // Simulating API delay
  //await new Promise(resolve => setTimeout(resolve, 300))
  console.log('ki', query);
  var requestOptions = {
    method: 'GET',
  };
  var config = {
    method: 'get',
    url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query.toLowerCase()}&format=json&apiKey=da8e34bff88b4ad98bf89226f27068ff`,
    headers: { }
  };
  const suggestedLocations = await axios(config);
  console.log("query",suggestedLocations);
  return suggestedLocations.data.results;
//   return allLocations.filter(location => 
//     location.toLowerCase().includes(query.toLowerCase())
//   )
}

function GymCard({ gym, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={`/placeholder.svg?height=200&width=300&text=${gym.name}`}
          alt={gym.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{gym.name}</h3>
          <button
            onClick={() => onToggleFavorite(gym.id)}
            className="text-gray-500 hover:text-red-500 focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {gym.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            ${gym.price}/hour
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {gym.travelTime} min travel time
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            {gym.rating}
          </div>
          <div>
            <strong>Amenities:</strong> {gym.amenities.join(', ')}
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t">
        <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-200 ease-in-out">
          Book Now
        </button>
      </div>
    </div>
  )
}

function SimpleMapView({ gyms }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 100 }).map((_, index) => {
          const x = index % 10
          const y = Math.floor(index / 10)
          const gym = gyms.find(g => g.x === x && g.y === y)
          
          return (
            <div
              key={index}
              className={`w-full pt-[100%] relative ${gym ? 'bg-emerald-600' : 'bg-gray-200'}`}
            >
              {gym && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                  {gym.id}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function GymSearch() {
  const [selectedLocation, setSelectedLocation]: any = useState('')  
  const [location, setLocation]: any = useState('')
  const [suggestions, setSuggestions]: any = useState([])
  const [maxPrice, setMaxPrice]: any = useState(50)
  const [maxTravelTime, setMaxTravelTime]: any = useState(30)
  const [searchTerm, setSearchTerm]: any = useState('')
  const [amenities, setAmenities]: any = useState([])
  const [gyms, setGyms]: any = useState([])
  const [loading, setLoading]: any = useState(false)
  const [error, setError]: any = useState(null)
  const [favorites, setFavorites]: any = useState([])
  const [currentPage, setCurrentPage]: any = useState(1)
  const [totalPages, setTotalPages]: any = useState(1)
  const [totalGyms, setTotalGyms]: any = useState(0)
  const [viewMode, setViewMode]: any = useState('list')
  const [isFilterOpen, setIsFilterOpen]: any = useState(false)
  const [showSuggestions, setShowSuggestions]: any = useState(false)

  const itemsPerPage = 6
  const debounceDelay = 1000
  const debounceTimerRef: any = useRef(null)

//   useEffect(() => {
//     loadGyms();
//   }, [location])

  const loadGyms = useCallback(async () => {
    console.log('selectedlocation', selectedLocation)
    if (!selectedLocation) return
    setLoading(true)
    try {
      const { gyms, totalPages, totalGyms } = await fetchGyms(
        { selectedLocation, maxPrice, maxTravelTime, searchTerm, amenities },
        currentPage,
        itemsPerPage
      )
      setGyms(gyms)
      setTotalPages(Math.max(1, totalPages))
      setTotalGyms(totalGyms)
    } catch (err) {
      setError('Failed to fetch gyms. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [selectedLocation, maxPrice, maxTravelTime, searchTerm, amenities, currentPage])

  useEffect(() => {
    loadGyms()
  }, [loadGyms])

  const toggleFavorite = (gymId) => {
    setFavorites((prev: any) => 
      prev.includes(gymId) 
        ? prev.filter(id => id !== gymId)
        : [...prev, gymId]
    )
  }

  const handleAmenityChange = (amenity) => {
    setAmenities((prev: any) => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  const handleLocationChange = (e) => {
    const value = e.target.value
    setLocation(value)
    setShowSuggestions(true)

    // Clear the previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set a new timer
    debounceTimerRef.current = setTimeout(async () => {
      if (value.length > 0) {
        const suggestedLocations = await fetchLocationSuggestions(value)
        setSuggestions(suggestedLocations)
      } else {
        setSuggestions([])
      }
    }, debounceDelay)
  }

  const handleSuggestionClick = (suggestion) => {
    
    setSelectedLocation(suggestion?.city)
    setLocation(suggestion?.formatted)
    setSuggestions([])
    setShowSuggestions(false)
  }

  const detectUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For this example, we'll just set it to "Downtown" when location is detected
          setLocation("Downtown")
          loadGyms()
        },
        (error) => {
          console.error("Error detecting location:", error)
        }
      )
    } else {
      console.log("Geolocation is not available in your browser.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-emerald-600">Find Your Perfect Gym</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={handleLocationChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 pr-10"
            />
            <button
              onClick={detectUserLocation}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500"
              aria-label="Detect my location"
            >
              <Crosshair className="w-5 h-5" />
            </button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="mt-1 bg-white border border-gray-300 rounded-md shadow-sm absolute z-10 w-full max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedLocation(suggestion?.city)
                    setLocation(suggestion?.formatted)
                    setSuggestions([])
                    setShowSuggestions(false)
                  }}
                >
                  {suggestion?.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedLocation && (
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <aside className="md:block">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 md:hidden">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="text-gray-500 focus:outline-none">
                    {isFilterOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </button>
                </div>
                <div className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                      Search Gyms
                    </label>
                    <div className="relative">
                      <input
                        id="search"
                        type="text"
                        placeholder="Search by gym name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
                      Max Hourly Rate: ${maxPrice}
                    </label>
                    <input
                      id="max-price"
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full"
                />
                  </div>
                  <div>
                    <label htmlFor="max-travel-time" className="block text-sm font-medium text-gray-700 mb-1">
                      Max Travel Time: {maxTravelTime} min
                    </label>
                    <input
                      id="max-travel-time"
                      type="range"
                      min="0"
                      max="60"
                      step="5"
                      value={maxTravelTime}
                      onChange={(e) => setMaxTravelTime(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                    <div className="space-y-2">
                      {['Pool', 'Sauna', 'Classes', 'Personal Training', '24/7 Access', 'Spa', 'Yoga Studio', 'CrossFit Area'].map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <input
                            id={`amenity-${amenity}`}
                            type="checkbox"
                            checked={amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => { setCurrentPage(1); loadGyms(); }}
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
                  >
                    <Filter className="inline-block w-4 h-4 mr-2" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </aside>

            <section>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-semibold mb-2 sm:mb-0">Available Gyms ({totalGyms})</h2>
                <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-md">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`py-2 px-4 rounded-md flex items-center transition duration-200 ease-in-out ${
                      viewMode === 'list'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <List className="w-5 h-5 mr-2" />
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`py-2 px-4 rounded-md flex items-center transition duration-200 ease-in-out ${
                      viewMode === 'map'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Map View
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader className="w-8 h-8 animate-spin text-emerald-600" />
                </div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : viewMode === 'list' ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gyms.map((gym) => (
                      <GymCard
                        key={gym.id}
                        gym={gym}
                        isFavorite={favorites.includes(gym.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                  {totalPages > 0 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                <SimpleMapView gyms={gyms} />
              )}

              {gyms.length === 0 && !loading && !error && (
                <p className="text-center text-gray-500 mt-8">No gyms found matching your criteria. Try adjusting your filters.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers: any = [];
  for (let i: any = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition duration-200 ease-in-out"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition duration-200 ease-in-out ${
            currentPage === number
              ? 'bg-emerald-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition duration-200 ease-in-out"
      >
        Next
      </button>
    </nav>
  )
}