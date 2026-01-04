import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Image
              src="/logo.png"
              alt="These Streets Logo"
              width={180}
              height={65}
              className="h-14 w-auto object-contain mix-blend-multiply mb-4"
            />
            <p className="text-muted-foreground text-sm">Eat like a local. Not like a tourist.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Tourists</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Download App
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Browse Guides
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Guides</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Become a Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Earnings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Restaurants</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Join Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 These Streets. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
