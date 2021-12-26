import { getDatabase, ref, set, query, child, get, push } from "firebase/database";
import { getStorage, ref as sRef, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { getDateString } from "./utils";

async function uploadImage(uniqueId, fileUrl, dateString) {
  const fileBlob = await fetch(fileUrl).then(r => r.blob());
  const storage = getStorage();
  const storageRef = sRef(storage, uniqueId);
  await uploadBytes(storageRef, fileBlob);
}

async function downloadImage() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = (event) => {
    const blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();
}

// export async function writeListing(url, date) {
//   const db = getDatabase();
//   const dateString = getDateString(date);
//   const listingsRef = ref(db, `listings/${dateString}`);
//   const newListingRef = push(listingsRef);
//   set(newListingRef, {
//     url,
//   });
// }

export async function writeListing(formData) {
  console.log(formData.displayDate)
  const db = getDatabase();
  const uniqueId = `${Date.now()}.png`;
  const dateString = getDateString(formData.displayDate);
  await uploadImage(uniqueId, formData.image, dateString)
  const listingsRef = ref(db, `listings/${dateString}`);
  const newListingRef = push(listingsRef);
  await set(newListingRef, { ...formData, imageUrl: uniqueId });
}

export async function readListings() {
  const db = getDatabase();
  const dateString = getDateString(new Date());
  // const listingsRef = query(ref(db, `listings/${dateString}`))
  const listingsRef = query(ref(db, `listings/2021-12-24`))

  return await get(listingsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const listings = []
      snapshot.forEach((childSnapshot) => {
        listings.push({ ...childSnapshot.val() })
      });
      // for (let i = 0; i < snapshot.length; i++) {
      //   const nftDetails = childSnapshot.val();
      //   const image = downloadImage(nftDetails.imageUrl);
      // }
      return listings
    } else {
      console.log("No data available");
      return [];
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const retrieveOpenSea = (listingUrls) => {
  const options = { method: 'GET' }
  // ?token_ids=1&token_ids=209
  let tokenIds = ''
  // ?asset_contract_addresses=0x1...&asset_contract_addresses=0x2
  let assetContractAddresses = ''
  if (listingUrls && listingUrls.length > 0) {
    listingUrls.forEach(({ url }, i) => {
      const tokenInfos = url.split('assets/')[1].split('/')
      const tokenId = tokenInfos[1]
      const assetContractAddress = tokenInfos[0]
      tokenIds = `${tokenIds}&token_ids=${tokenId}`
      assetContractAddresses = `${assetContractAddresses}&asset_contract_addresses=${assetContractAddress}`
    })

    const tokenInfos = tokenIds + assetContractAddresses
    return fetch(`https://api.opensea.io/api/v1/assets?order_direction=desc${tokenInfos}`, options)
      .then(response => response.json())
      .then((response) => {
        console.log({ response })
        const assets = []
        response.assets.forEach(asset => {
          const {
            name,
            permalink,
            token_id: tokenId,
            image_original_url: imageUrl,
            collection: { name: collectionName },
            // owner: { user: { username: owner }}
          } = asset
          assets.push({ name, imageUrl, collectionName, tokenId, permalink })
        })
        return assets;
        // const {
        //   name,
        //   token_id: tokenId,
        //   image_original_url: imageUrl,
        //   collection: { name: collectionName },
        //   owner: { user: { username: owner }}
        // } = response
        // console.log(imageUrl)
        // setData({ name, imageUrl, collectionName, owner, tokenId })
      })
      .catch(err => console.error(err));
    }
    return null
}

export function writeData() {
  const db = getDatabase();
  set(ref(db, 'test'), {
    username: 'name',
    email: 'email',
    profile_picture : 'imageUrl'
  });
}