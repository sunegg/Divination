#import "DeviceUtils.h"
#import <AdSupport/ASIdentifierManager.h>

@implementation DeviceUtils


+ (NSString *)getIDFAString
{
    NSString *adId = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    return adId;
}

+ (NSString *)getIDFVString
{
    NSString *idfv = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    return idfv;
}

@end
