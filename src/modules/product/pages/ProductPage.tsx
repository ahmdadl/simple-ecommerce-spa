import ProductDetails from '../components/ProductDetails';
import ProductHero from '../components/ProductHero';
import ProductImages from '../components/ProductImages';
import ProductPageView from '../components/ProductPageView';
import RelatedProducts from '../components/RelatedProducts';

export default function ProductPage() {
    return (
        <>
            <ProductHero />

            <div className='px-2 lg:px-4 py-8 mx-auto xl:max-w-7xl'>
                <div className='grid gap-8 md:grid-cols-2'>
                    <ProductImages />

                    <ProductDetails />
                </div>

                <RelatedProducts />
            </div>

            <ProductPageView />
        </>
    );
}
