
import { initialProductsData, initialCollectionsData } from '../../../context/initialProductData';
import { 
    initialFaqData, 
    initialHeroData, 
    initialPartnerData, 
    initialHowWeWorkData, 
    initialMaterialData, 
    initialInfoCardData, 
    initialFeaturedVideoData, 
    initialBrandReviewData, 
    initialPlatformRatingData, 
    initialCommunityPostData,
    initialPageBannerData,
    initialServiceData,
    initialCapabilityData,
    initialSubscriptionModalData,
    initialHomeFeatureData
} from '../../../context/initialContentData';

interface Env {
  STATSCUSTOMSDATA: any;
  ADMIN_SECRET: string;
}

const DATA_TO_SEED: Record<string, any> = {
    products: initialProductsData,
    collections: initialCollectionsData,
    faqs: initialFaqData,
    heroContents: initialHeroData,
    partners: initialPartnerData,
    howWeWorkSections: initialHowWeWorkData,
    materials: initialMaterialData,
    infoCards: initialInfoCardData,
    featuredVideoContent: initialFeaturedVideoData,
    brandReviews: initialBrandReviewData,
    platformRatings: initialPlatformRatingData,
    communityPosts: initialCommunityPostData,
    pageBanners: initialPageBannerData,
    services: initialServiceData,
    capabilities: initialCapabilityData,
    subscriptionModalContent: initialSubscriptionModalData,
    homeFeature: initialHomeFeatureData
};

export const onRequestGet = async (context: { env: Env; request: Request }) => {
    const { request, env } = context;

    // Basic Authentication Check
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return new Response('Authentication required', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
        });
    }
    
    // Retrieve stored credentials to validate against
    const storedCredsRaw = await env.STATSCUSTOMSDATA.get('credential');
    let validUser = 'admin'; // Default fallback if not set
    let validPass = 'password';

    if (storedCredsRaw) {
        const creds = JSON.parse(storedCredsRaw);
        validUser = creds.username;
        validPass = creds.password;
    }

    const auth = atob(authHeader.split(' ')[1]);
    const [user, pass] = auth.split(':');

    if (user !== validUser || pass !== validPass) {
        return new Response('Invalid credentials', { status: 401 });
    }

    // Seeding Logic for Cloudflare KV
    try {
        let count = 0;
        const keys = Object.keys(DATA_TO_SEED);

        for (const key of keys) {
            const data = DATA_TO_SEED[key];
            await env.STATSCUSTOMSDATA.put(key, JSON.stringify(data));
            count++;
        }

        const successMessage = `
            <h1>Database Seeding Successful!</h1>
            <p>Successfully seeded ${count} data keys into your Cloudflare KV store.</p>
            <p><strong>Keys loaded:</strong> ${keys.join(', ')}</p>
            <p>Your website content is now live.</p>
        `;
        
        return new Response(successMessage, { 
            status: 200, 
            headers: { 'Content-Type': 'text/html' }
        });

    } catch (error: any) {
        return new Response(`<h1>Seeding Failed</h1><p>An error occurred: ${error.message}</p>`, { 
            status: 500, 
            headers: { 'Content-Type': 'text/html' }
        });
    }
};
