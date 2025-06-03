
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { propertyListings, rentalProperties, getAffordableProperties, getAffordableRentals, purchaseProperty, rentProperty } from '../../systems/realEstateSystem';

interface RealEstateTabProps {
  character: Character;
  onRealEstateAction: (action: string, data: any) => void;
}

export const RealEstateTab: React.FC<RealEstateTabProps> = ({ character, onRealEstateAction }) => {
  const [selectedTab, setSelectedTab] = useState('buy');
  
  const affordableProperties = getAffordableProperties(character);
  const affordableRentals = getAffordableRentals(character);

  const handlePurchase = (property: any) => {
    const result = purchaseProperty(character, property);
    onRealEstateAction('purchase_property', { property, result });
  };

  const handleRent = (rental: any) => {
    const result = rentProperty(character, rental);
    onRealEstateAction('rent_property', { rental, result });
  };

  return (
    <div className="p-4 max-h-screen overflow-y-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏠 Your Real Estate
          </CardTitle>
        </CardHeader>
        <CardContent>
          {character.realEstate && character.realEstate.length > 0 ? (
            <div className="space-y-2">
              {character.realEstate.map((property) => (
                <div key={property.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{property.address}</h4>
                      <p className="text-sm text-gray-600">
                        {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                      </p>
                      <p className="text-sm">Value: ${property.currentValue}k</p>
                    </div>
                    <Badge variant={property.owned ? "default" : "secondary"}>
                      {property.owned ? 'Owned' : 'Renting'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You don't own any real estate yet.</p>
          )}
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy">Buy Property</TabsTrigger>
          <TabsTrigger value="rent">Rent Property</TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-4">
          {affordableProperties.length > 0 ? (
            affordableProperties.map((property) => (
              <Card key={property.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{property.address}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-medium">${property.price}k</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Down Payment</p>
                      <p className="font-medium">${property.downPaymentRequired}k</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Payment</p>
                      <p className="font-medium">${property.monthlyMortgage}/month</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bedrooms/Bathrooms</p>
                      <p className="font-medium">{property.bedrooms}bd / {property.bathrooms}ba</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{property.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => handlePurchase(property)}
                    className="w-full"
                    disabled={character.wealth < property.downPaymentRequired}
                  >
                    Buy Property
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">
                  No affordable properties available. Increase your wealth or get a better job!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rent" className="space-y-4">
          {affordableRentals.length > 0 ? (
            affordableRentals.map((rental) => (
              <Card key={rental.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{rental.address}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Rent</p>
                      <p className="font-medium">${rental.monthlyRent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Security Deposit</p>
                      <p className="font-medium">${rental.deposit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lease Length</p>
                      <p className="font-medium">{rental.leaseLength} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Condition</p>
                      <Badge variant="outline">{rental.condition}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rental.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => handleRent(rental)}
                    className="w-full"
                    disabled={character.wealth < (rental.monthlyRent + rental.deposit)}
                  >
                    Rent Property
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">
                  No affordable rentals available. Get a better job to increase your income!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
