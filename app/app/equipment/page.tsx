
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Equipment } from '@/lib/types';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Filter,
  Plus,
  Wrench,
  Star
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [listingTypeFilter, setListingTypeFilter] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await fetch('/api/equipment');
      if (response.ok) {
        const data = await response.json();
        setEquipment(data.equipment || []);
      }
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || 
      item.category === categoryFilter;
    
    const matchesCondition = conditionFilter === '' || 
      item.condition === conditionFilter;
    
    const matchesListingType = listingTypeFilter === '' || 
      (listingTypeFilter === 'sale' && item.forSale) ||
      (listingTypeFilter === 'rent' && item.forRent);

    return matchesSearch && matchesCategory && matchesCondition && matchesListingType;
  });

  const getCategoryLabel = (category: string) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'EXCELLENT': return 'text-green-600';
      case 'GOOD': return 'text-blue-600';
      case 'FAIR': return 'text-yellow-600';
      case 'NEEDS_REPAIR': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="container-responsive py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="loading-skeleton h-80 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg">Equipment Marketplace</h1>
          <p className="body-md text-gray-600">
            Buy, sell, and rent professional tree care equipment
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          List Equipment
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search equipment by name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="input-label">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    <SelectItem value="CHAINSAWS">Chainsaws</SelectItem>
                    <SelectItem value="CLIMBING_GEAR">Climbing Gear</SelectItem>
                    <SelectItem value="CHIPPERS">Chippers</SelectItem>
                    <SelectItem value="BUCKET_TRUCKS">Bucket Trucks</SelectItem>
                    <SelectItem value="STUMP_GRINDERS">Stump Grinders</SelectItem>
                    <SelectItem value="SAFETY_EQUIPMENT">Safety Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="input-label">Condition</label>
                <Select value={conditionFilter} onValueChange={setConditionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any condition</SelectItem>
                    <SelectItem value="EXCELLENT">Excellent</SelectItem>
                    <SelectItem value="GOOD">Good</SelectItem>
                    <SelectItem value="FAIR">Fair</SelectItem>
                    <SelectItem value="NEEDS_REPAIR">Needs Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="input-label">Listing Type</label>
                <Select value={listingTypeFilter} onValueChange={setListingTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All listings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All listings</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="body-sm text-gray-600">
          {filteredEquipment.length} item{filteredEquipment.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="equipment-card card-hover">
              <div className="relative aspect-[4/3] bg-gray-100 rounded-t-xl overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Wrench className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                {!item.available && (
                  <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Unavailable
                    </span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.brand} {item.model} ({item.year})</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className={`text-sm font-medium ${getConditionColor(item.condition)}`}>
                    {item.condition.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </div>

                <div className="space-y-2">
                  {item.forSale && item.price && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sale Price:</span>
                      <span className="font-bold text-primary-600">${item.price.toLocaleString()}</span>
                    </div>
                  )}
                  {item.forRent && item.dailyRentalRate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Daily Rate:</span>
                      <span className="font-bold text-secondary-500">${item.dailyRentalRate}/day</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {item.forSale && (
                    <Button size="sm" className="flex-1">
                      Buy Now
                    </Button>
                  )}
                  {item.forRent && (
                    <Button size="sm" variant="outline" className="flex-1">
                      Rent
                    </Button>
                  )}
                  {!item.forSale && !item.forRent && (
                    <Button size="sm" variant="outline" className="w-full">
                      Contact Owner
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="heading-sm text-gray-700 mb-2">No equipment found</h3>
            <p className="body-md text-gray-600 mb-4">
              Try adjusting your search criteria
            </p>
            <Button variant="outline">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
