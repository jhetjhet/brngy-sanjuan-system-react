

export default function Footer() {

    return (
        <footer>
            <hr />
            <div className="h-16 bg-gray-100 flex justify-center items-center">
                <span className="text-sm text-gray-500">© {new Date().getFullYear()} <a href="#" className="hover:underline">Barangay San Juan</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}