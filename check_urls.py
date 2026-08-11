import urllib.request
import concurrent.futures

urls = [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80",
    "https://images.unsplash.com/photo-1558769132543-b9ee0fa997dc?w=1600&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1600&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    "https://images.unsplash.com/photo-1529139574466-a30ec4f20815?w=600&q=80",
    "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&q=80",
    "https://images.unsplash.com/photo-1485230895905-eb5442e92c2a?w=800&q=80",
    "https://images.unsplash.com/photo-1488161628813-04466f87228c?w=800&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&q=80",
    "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=600&q=80",
    "https://images.unsplash.com/photo-1550614000-4b953fb3f40f?w=600&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80",
    "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    "https://images.unsplash.com/photo-1434389678278-be4d41a6b8e0?w=600&q=80",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=80",
    "https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?w=1200&q=80",
    "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=1200&q=80",
    "https://images.unsplash.com/photo-1549488344-c13f6ebecaf0?w=1200&q=80",
    "https://images.unsplash.com/photo-1508216298514-610196726e6d?w=800&q=80",
    "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&q=80",
    "https://images.unsplash.com/photo-1475179450893-9c8e88e89404?w=600&q=80",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
    "https://images.unsplash.com/photo-1441551069720-6d0dfc2bc047?w=1600&q=80",
    "https://images.unsplash.com/photo-1470309864661-68341ea22eaf?w=800&q=80",
    "https://images.unsplash.com/photo-1512436991641-b32f3cd29c4f?w=800&q=80",
    "https://images.unsplash.com/photo-1481575024227-cb52fbc923ce?w=300&q=80",
    "https://images.unsplash.com/photo-1551804820980-8736a4ce3829?w=300&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80"
]

def check_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status != 200:
                print(f"BROKEN ({response.status}): {url}")
    except Exception as e:
        print(f"BROKEN ({e}): {url}")

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(check_url, urls)

print("Check complete")
