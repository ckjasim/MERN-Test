import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CalendarIcon, BriefcaseIcon, HomeIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getUserDataApi } from '@/services/api/authApi';

const UserDataPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await getUserDataApi(id);
        console.log('User data:', data);  
        setUserData(data);
      } catch (error) {
        console.error('Error fetching saved form:', error);
      }
    };

    fetchData();
  }, [id]);
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{userData?.title} {userData?.fullName}</h1>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{userData?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium">{userData?.mobile}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDate(userData?.dateOfBirth)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Address Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Current Address</p>
                    <p className="font-medium">{userData?.currentAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Duration at Address</p>
                    <p className="font-medium">{userData?.addressDuration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employment and Investment Information */}
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Employment & Investment</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Employment Status</p>
                  <p className="font-medium">{userData?.employmentStatus}</p>
                </div>
              </div>

              {userData?.additionalInvestments && (
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Additional Investments</p>
                    <p className="font-medium">{userData?.additionalInvestments}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* About Section */}
          {userData?.aboutYourself && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">About</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{userData?.aboutYourself}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDataPage;