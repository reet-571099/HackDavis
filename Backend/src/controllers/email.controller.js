const { db } = require('../config/firebase');
const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Send learning stats email
const sendLearningStatsEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Get category stats from Firestore
    const categoryStatsSnapshot = await db.collection('categoryStats').get();
    
    if (categoryStatsSnapshot.empty) {
      return res.status(404).json({ error: 'No category stats found' });
    }
    
    // Process category stats
    const categoryStats = {};
    let totalTrueCount = 0;
    let totalFalseCount = 0;
    
    categoryStatsSnapshot.forEach(doc => {
      const data = doc.data();
      categoryStats[doc.id] = {
        trueCount: data.trueCount || 0,
        falseCount: data.falseCount || 0
      };
      
      totalTrueCount += data.trueCount || 0;
      totalFalseCount += data.falseCount || 0;
    });
    
    // Calculate overall success rate
    const totalAttempts = totalTrueCount + totalFalseCount;
    const overallSuccessRate = totalAttempts > 0 ? (totalTrueCount / totalAttempts) * 100 : 0;
    
    // Generate email body with AI analysis
    const emailBody = generateEmailBody(categoryStats, overallSuccessRate, totalAttempts);
    
    // Send email using nodemailer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your child's weekly learning stats !!",
      html: emailBody
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

// Generate email body with AI analysis
const generateEmailBody = (categoryStats, overallSuccessRate, totalAttempts) => {
  // Sort categories by success rate
  const sortedCategories = Object.entries(categoryStats)
    .map(([category, stats]) => {
      const total = stats.trueCount + stats.falseCount;
      const successRate = total > 0 ? (stats.trueCount / total) * 100 : 0;
      return { category, stats, successRate, total };
    })
    .sort((a, b) => b.successRate - a.successRate);
  
  // Find top performing categories
  const topCategories = sortedCategories.slice(0, 3);
  
  // Find categories needing improvement
  const categoriesNeedingImprovement = sortedCategories
    .filter(cat => cat.total >= 3) // Only consider categories with at least 3 attempts
    .slice(-3)
    .reverse();
  
  // Generate HTML email body
  let htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h1 style="color: #4a6fa5; text-align: center;">Your Child's Learning Progress Report</h1>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Overall Progress</h2>
        <p>Your child has completed <strong>${totalAttempts}</strong> learning activities with an overall success rate of <strong>${overallSuccessRate.toFixed(1)}%</strong>.</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #4a6fa5;">Top Performing Categories</h2>
        <ul style="list-style-type: none; padding-left: 0;">
  `;
  
  // Add top categories
  topCategories.forEach(cat => {
    htmlBody += `
          <li style="margin-bottom: 10px; padding: 10px; background-color: #e8f4f8; border-radius: 5px;">
            <strong>${formatCategoryName(cat.category)}</strong>: ${cat.successRate.toFixed(1)}% success rate (${cat.stats.trueCount} successful out of ${cat.total} attempts)
          </li>
    `;
  });
  
  htmlBody += `
        </ul>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2 style="color: #4a6fa5;">Areas for Improvement</h2>
        <ul style="list-style-type: none; padding-left: 0;">
  `;
  
  // Add categories needing improvement
  categoriesNeedingImprovement.forEach(cat => {
    htmlBody += `
          <li style="margin-bottom: 10px; padding: 10px; background-color: #fff3e0; border-radius: 5px;">
            <strong>${formatCategoryName(cat.category)}</strong>: ${cat.successRate.toFixed(1)}% success rate (${cat.stats.trueCount} successful out of ${cat.total} attempts)
          </li>
    `;
  });
  
  // Add recommendations
  htmlBody += `
        </ul>
      </div>
      
      <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h2 style="color: #4a6fa5;">Recommendations</h2>
        <p>Based on your child's performance, we recommend focusing on:</p>
        <ul>
  `;
  
  // Add recommendations based on categories needing improvement
  categoriesNeedingImprovement.forEach(cat => {
    htmlBody += `
          <li>More activities in <strong>${formatCategoryName(cat.category)}</strong> to improve understanding and application</li>
    `;
  });
  
  // Add general recommendations
  if (overallSuccessRate < 70) {
    htmlBody += `
          <li>Reviewing completed activities to reinforce learning</li>
          <li>Breaking down complex tasks into smaller, manageable steps</li>
    `;
  }
  
  htmlBody += `
        </ul>
      </div>
      
      <div style="margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
        <p>Keep encouraging your child's learning journey! Every attempt is a step toward growth and understanding.</p>
      </div>
    </div>
  `;
  
  return htmlBody;
};

// Format category name for display
const formatCategoryName = (category) => {
  // Capitalize first letter and replace underscores with spaces
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
};

module.exports = {
  sendLearningStatsEmail
}; 