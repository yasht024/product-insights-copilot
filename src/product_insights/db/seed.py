import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

import random
from datetime import datetime, timedelta, timezone
from product_insights.db.session import engine, SessionLocal
from product_insights.db.models import Base, Workspace, Review

def seed_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    print("Seeding workspace...")
    ws = db.query(Workspace).filter_by(id="ws_1").first()
    if not ws:
        ws = Workspace(id="ws_1", name="Groww Mobile App", slug="groww-mobile-app")
        db.add(ws)
        db.commit()
    
    print("Seeding reviews...")
    existing_count = db.query(Review).count()
    if existing_count > 0:
        print(f"Already have {existing_count} reviews. Skipping seed.")
        db.close()
        return

    platforms = ["Apple App Store", "Google Play Store"]
    versions = ["v2.4.0", "v2.3.9", "v2.3.8"]
    authors = ["Alex K.", "Sarah M.", "John D.", "Emma W.", "Michael T.", "Chris P.", "Jessica B.", "David S.", "Amanda L.", "Ryan G."]
    
    reviews_data = [
        # 1-star (Severe Negative / Crash)
        ("Frequent crashes on iOS 17.4 when uploading large raw files. Please patch ASAP.", 1, "Crash / Bug"),
        ("App completely freezes when trying to open the settings menu. Have to force close.", 1, "Crash / Bug"),
        ("I paid for the premium subscription but it says I am still on the free plan.", 1, "Billing & Subscriptions"),
        ("Latest update broke the cloud sync. I lost hours of work.", 1, "Crash / Bug"),
        ("Battery drains insanely fast when using this app now. Unusable.", 1, "Performance"),
        
        # 2-star (Negative)
        ("The new UI is confusing. Why did you move the export button?", 2, "UX & Usability"),
        ("Performance is really sluggish on my older Android device since the v2.4 update.", 2, "Performance"),
        ("I like the features but it's too expensive for what it does.", 2, "Billing & Subscriptions"),
        ("Dark mode has weird white text on white background in some menus.", 2, "UX & Usability"),
        
        # 3-star (Mixed)
        ("It's okay. I wish it had more keyboard shortcuts like the desktop app.", 3, "Feature Request"),
        ("Works fine most of the time but occasional lag when scrolling long lists.", 3, "Performance"),
        ("Decent app, but the onboarding process is way too long.", 3, "UX & Usability"),
        
        # 4-star (Positive)
        ("Great app! Would love to see an iPad landscape mode in the future.", 4, "Feature Request"),
        ("Really smooth experience overall. Just a minor glitch with notifications.", 4, "Crash / Bug"),
        ("Worth the subscription, though I hope they add more export formats.", 4, "Feature Request"),
        
        # 5-star (Praise)
        ("Absolutely life-changing app. The new AI features in v2.4 are incredible.", 5, "UX & Usability"),
        ("Customer support is top notch. They fixed my billing issue in 5 minutes.", 5, "Billing & Subscriptions"),
        ("Flawless performance and beautiful design. Highly recommended.", 5, "Performance"),
        ("I've used every alternative and this is by far the best one on the market.", 5, "UX & Usability"),
        ("Thank you for finally adding face ID support!", 5, "Feature Request")
    ]
    
    statuses = ["Unread", "Replied", "Flagged", "Archived"]
    
    now = datetime.now(timezone.utc)
    
    for i in range(100):
        data = random.choice(reviews_data)
        
        # Add some variation to the text
        text = data[0]
        if random.random() > 0.7:
            text += f" (Edit: Still an issue in {random.choice(versions)})"
            
        review = Review(
            id=f"rev_{1000 + i}",
            workspace_id="ws_1",
            author=random.choice(authors),
            platform=random.choice(platforms),
            rating=data[1],
            text=text,
            version=random.choice(versions),
            status=random.choices(statuses, weights=[70, 15, 5, 10])[0], # Mostly Unread
            created_at=now - timedelta(days=random.randint(0, 30), hours=random.randint(0, 24))
        )
        db.add(review)
        
    db.commit()
    print("Database seeded successfully with 100 reviews!")
    db.close()

if __name__ == "__main__":
    seed_db()
