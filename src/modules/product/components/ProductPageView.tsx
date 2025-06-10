import { productRoute } from '@/routes/$locale/products/$slug';

export default function ProductPageView() {
    const { slug } = productRoute.useParams();

    return <></>;
}
