
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="container-responsive py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-lg mb-6">Profile</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="input-label">Name</label>
              <p className="text-lg">{session.user.name}</p>
            </div>
            
            <div>
              <label className="input-label">Email</label>
              <p className="text-lg">{session.user.email}</p>
            </div>
            
            <div>
              <label className="input-label">Account Type</label>
              <p className="text-lg">{session.user.userType}</p>
            </div>
            
            <div>
              <label className="input-label">Verification Status</label>
              <p className={`text-lg ${session.user.verified ? 'text-green-600' : 'text-orange-600'}`}>
                {session.user.verified ? 'Verified' : 'Pending Verification'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
