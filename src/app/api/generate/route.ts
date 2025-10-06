export const dynamic = "force-dynamic";

// NOTE: This route calls the Doubao (Volces) image generation API
// to access Doubao SeedEdit model. It accepts a text prompt
// and an uploaded image (as a data URL), then returns any image URLs
// found in the response so the client can render them.
export async function POST(request: Request) {
  console.log("[Route] POST /api/generate - 请求开始");
  try {
    const { prompt, image } = await request.json();
    console.log("[Route] 接收到的参数:", {
      prompt: prompt?.substring(0, 100),
      hasImage: !!image,
    });

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    if (!image) {
      throw new Error("Image is required for Doubao SeedEdit model");
    }

    // Convert data URL to URL format if needed
    const imageUrl = image;
    if (image.startsWith('data:')) {
      // For data URLs, we'll need to upload or handle differently
      // For now, assume the image is already accessible via URL
      console.log("[Route] 检测到 data URL 格式的图片");
    }

    console.log("[Route] 准备调用豆包 API");

    const requestBody = {
      model: "doubao-seededit-3-0-i2i-250628",
      prompt: prompt,
      image: imageUrl,
      response_format: "url",
      size: "adaptive",
      seed: 21,
      guidance_scale: 5.5,
      watermark: true
    };

    const response = await fetch(
      "https://ark.cn-beijing.volces.com/api/v3/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.DOUBAO_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      console.error("[Route] API 响应错误:", response.status, response.statusText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    console.log("[Route] API 调用成功，解析响应数据");
    const data = await response.json();

    // Extract image URLs from Doubao API response
    const images: string[] = [];
    try {
      // Doubao API returns data.data array with image objects
      if (data?.data && Array.isArray(data.data)) {
        for (const item of data.data) {
          if (item?.url) {
            images.push(item.url);
          }
        }
      }
    } catch (e) {
      console.warn("[Route] 提取图片 URL 时出错，返回原始数据", e);
    }

    console.log("[Route] 返回响应数据, 提取出的图片数量:", images.length);
    return Response.json({ success: true, images, raw: data });
  } catch (error) {
    console.error("[Route] 发生错误:", error);
    return Response.json(
      { success: false, error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
