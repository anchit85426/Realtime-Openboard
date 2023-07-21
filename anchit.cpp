#include<bits/stdc++.h>
using namespace std;
#define int long long int
#define ll long long 
#define mod 1e9
#define pb push_back
#define F first
#define S second
#define endl "\n"
#define fl for(int i=0;i<n;i++)
typedef vector<int> vll;
typedef pair<int,int> pll;
typedef vector<pll> vpll;
#define print(a) for(auto x:a) cout<<x<<" "; cout<<endl // vector print 
#define print1(a) for(auto x:a)cout <<x.F<<" "<<x.S<<endl// maps or pairs
#define print2(a,x,y) for(int i=x;i<y;i++) cout<<a[i]<<" ";cout<<endl
bool isPerfectSquare(ll x){
if (x >= 0) {
ll sr = sqrt(x);
return (sr * sr == x);
}
return false;
}

int binExp(int a,int b){
    int ans=1;
    while(b>0){
        if(b&1){
            ans=(ans*a);
        }
        a=a*a;
        b=b>>1;
    }
    return ans;
}
const int N = 1e5+10;
int bit[N];
// fenwick tree
void update(int i, int x){
    for(; i < N; i += (i&-i))
        bit[i] += x;
}

int sum(int i){
    int ans = 0;
    for(; i > 0; i -= (i&-i))
        ans += bit[i];
    return ans;
}
void  solve()
{
    int n;
    cin>>n;
    vll a(n),b(n);
   vector<pair<int,int>>v;
    map<int,int>mpp;
    int maxi=-1;
    for(int i=0;i<n;i++){
        cin>>a[i];
        cin>>b[i];
        mpp[a[i]]++;
        mpp[b[i]]++;
        v.push_back({a[i],b[i]});
        v.push_back({b[i],a[i]});
        int x=min(a[i],b[i]);
        maxi=max(maxi,x);
    }

    sort(v.begin(),v.end());
    
    int x=v.size();
    int pos=-1;
   for(int i=0;i<x;i++){
    if(v[i].first==maxi){
        pos=i;
        break;
    }
   }
   int ans=1e9;
   
   for(int i=pos;i<x;i++){
    int value=v[i].second;
    mpp[value]--;
    mpp[v[i].first]--;
    
    int j=i-1;
     while(j>=0 and mpp[v[j].first]==0){
        
        j--;
     }
     if(j>=0 and mpp[v[j].first]!=0){
        
        ans=min(ans,abs(v[i].first-v[j].first));
       
     }
     
     j=i+1;
     while(j<x and mpp[v[j].first]==0){
        j++;
     }
     if(j<x and mpp[v[j].first]!=0){
        ans=min(ans,abs(v[i].first-v[j].first));
     }
     mpp[value]++;
     mpp[v[i].first]++;
    
   }
   cout<<ans<<endl;
}


int32_t main()
{
   
    int t;
    t = 1;
    cin >> t;
    while (t--) {
        solve();
    }

    return 0;

}