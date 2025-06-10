export function useIsMobile() {
    const isMobile = window.innerWidth < 868;
    // const [isMobile, setIsMobile] = useState(window.innerWidth < 868);

    // useEffect(() => {
    //     const checkIfMobile = () => {
    //         setIsMobile(window.innerWidth < 768);
    //     };

    //     // Check on initial load
    //     checkIfMobile();

    //     // Add event listener for window resize
    //     window.addEventListener('resize', checkIfMobile);

    //     // Clean up event listener
    //     return () => window.removeEventListener('resize', checkIfMobile);
    // }, []);

    return isMobile;
}
