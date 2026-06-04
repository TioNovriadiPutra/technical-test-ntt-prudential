import { Box, Element4 } from "iconsax-reactjs";
import { Flex, SidebarButton } from "../shared";
import { Link, Outlet, useLocation } from "react-router";
import useUserService from "@/services/user.service";
import UserProfileSkeleton from "./UserProfileSkeleton";
import { generateBreadcrumb } from "@/utils/helper/generator";
import { ConfirmationModal, DetailModal } from "../modal";

const AppLayout = () => {
  const { pathname } = useLocation();

  const { useGetUserInfoService } = useUserService();

  const { finalData, isLoading } = useGetUserInfoService();

  const crumbs = generateBreadcrumb(pathname);

  return (
    <Flex className="flex-1 flex-row!">
      <Flex className="w-65 border-r border-r-neutral-200 bg-neutral-50 pt-2">
        <Flex className="flex-1 px-3.5 gap-1">
          <SidebarButton
            dest="/"
            icon={Element4}
            label="Home"
            isActive={pathname === "/"}
          />

          <SidebarButton
            dest="/products"
            icon={Box}
            label="Product"
            isActive={pathname === "/products"}
          />
        </Flex>

        {isLoading ? (
          <UserProfileSkeleton />
        ) : (
          <Flex className="flex-row! items-center px-2.5 py-3.5 border-t border-t-neutral-200 gap-3">
            <Flex className="flex-1 flex-row! items-center p-1.5 gap-3">
              <Flex className="size-10 rounded-lg items-center justify-center overflow-hidden">
                <img
                  src={finalData.profilePic}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </Flex>

              <Flex className="flex-1 gap-0.5">
                <p className="text-sm font-medium text-neutral-900">
                  {finalData.fullName}
                </p>

                <p className="text-xs text-neutral-500">{finalData.roleName}</p>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>

      <Flex className="flex-1">
        <Flex className="py-[21.5px] px-6 border-b border-b-neutral-200">
          <Flex className="flex-row! items-center">
            {crumbs.map((crumb, index) => (
              <p key={index.toString()} className="text-sm font-medium">
                {index === crumbs.length - 1 ? (
                  <span className="text-neutral-800">{crumb.label}</span>
                ) : (
                  <>
                    <Link
                      to={crumb.dest}
                      className="text-neutral-500 hover:text-neutral-800 transition-colors duration-300"
                    >
                      {crumb.label}
                    </Link>
                    <span className="mx-2 text-neutral-300">•</span>
                  </>
                )}
              </p>
            ))}
          </Flex>
        </Flex>

        <Flex className="flex-1 overflow-hidden">
          <Outlet />
        </Flex>
      </Flex>

      <ConfirmationModal />
      <DetailModal />
    </Flex>
  );
};

export default AppLayout;
